// MessageGenerator
const oxoKeyPairs = require('oxo-keypairs')
const GENESIS_ADDRESS = "oeZELFBq5mbE4y5XdvG1f3DsW85FM7HHGM"
const SYSTEM_MEDIA_CODE = "OXO"
const SYSTEM_MEDIA_ISSUER = GENESIS_ADDRESS
const SYSTEM_ACCOUNT_RESERVE = 100 * 1000000
const SYSTEM_MIN_FEE = 100
const SYSTEM_ISSUER_RESERVE = 1000000 * 1000000

// os68E98wf881hNm8Fn8hqxTN88pRzszt8R:xr33p2DpwRJepEkCTTAR4tRQPsvfr

let Seed = 'xr33p2DpwRJepEkCTTAR4tRQPsvfr'
let KeyPair = oxoKeyPairs.deriveKeypair(Seed)
let Address = oxoKeyPairs.deriveAddress(KeyPair.publicKey)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>${Address}`)
let PublicKey = KeyPair.publicKey
let PrivateKey = KeyPair.privateKey

function strToHex(str) {
  let arr = []
  let length = str.length
  for (let i = 0; i < length; i++) {
    arr[i] = (str.charCodeAt(i).toString(16))
  }
  return arr.join('').toUpperCase()
}

function sign(msg, sk) {
  let msgHexStr = strToHex(msg)
  let sig = oxoKeyPairs.sign(msgHexStr, sk)
  return sig
}

function msgSigned(json, pk, sk) {
  json.PublicKey = pk
  let sig = sign(JSON.stringify(json), sk)
  json.Signature = sig
  return JSON.stringify(json)
}

function msgDeclare(pk, sk) {
  let json = {
    "Action": "Declare",
    "Timestamp": Date.now()
  }
  return msgSigned(json, pk, sk)
}

function msgPayment(pk, sk, sequence, dest_address, issuer, subject, amount) {
  let json = {
    "TxType": "Payment",
    "Sequence": sequence,
    "DestAddress": dest_address,
    "Issuer": issuer,
    "Subject": subject,
    "Amount": amount
  }
  return msgSigned(json, pk, sk)
}

function msgSubjectProclaim(pk, sk, sequence, subject, rate) {
  let json = {
    "TxType": "SubjectProclaim",
    "Sequence": sequence,
    "Subject": subject,
    "Rate": rate
  }
  return msgSigned(json, pk, sk)
}

function msgSubjectRevoke(pk, sk, sequence, subject) {
  let json = {
    "TxType": "SubjectRevoke",
    "Sequence": sequence,
    "Subject": subject
  }
  return msgSigned(json, pk, sk)
}

function msgTrustCreate(pk, sk, sequence, issuer, subject) {
  let json = {
    "TxType": "TrustCreate",
    "Sequence": sequence,
    "Issuer": issuer,
    "Subject": subject
  }
  return msgSigned(json, pk, sk)
}

function msgTrustRemove(pk, sk, sequence, issuer, subject) {
  let json = {
    "TxType": "TrustRemove",
    "Sequence": sequence,
    "Issuer": issuer,
    "Subject": subject
  }
  return msgSigned(json, pk, sk)
}

function msgOfferCreate(pk, sk, sequence, pay_issuer, pay_subject, pay_amount, get_issuer, get_subject, get_amount) {
  let json = {
    "TxType": "OfferCreate",
    "Sequence": sequence,
    "PayIssuer": pay_issuer,
    "PaySubject": pay_subject,
    "PayAmount": pay_amount,
    "GetIssuer": get_issuer,
    "GetSubject": get_subject,
    "GetAmount": get_amount,
  }
  return msgSigned(json, pk, sk)
}

function msgOfferCancel(pk, sk, sequence, offer_sequence) {
  let json = {
    "TxType": "OfferCancel",
    "Sequence": sequence,
    "OfferSequence": offer_sequence
  }
  return msgSigned(json, pk, sk)
}

console.log(msgDeclare(PublicKey, PrivateKey))