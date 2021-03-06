const firstPrime = 2;
const secondPrime = 5;
const N = firstPrime * secondPrime;
const phiOfN = (firstPrime - 1) * (secondPrime - 1);
let publicKey = 0;

function hashTheMessage(message) {
  let hashValue = 0;
  for (let i = 0, msgLength = message.length; i < msgLength; ++i) {
    hashValue += message.charCodeAt(i);
  }
  return hashValue % N;
}

function isCoPrime(smallerNum, largerNum) {
  for (let i = 2; i <= smallerNum; ++i) {
    if (smallerNum % i === 0 && largerNum % i === 0) {
      return false;
    }
  }
  return true;
}

function generatePrivateKey() {
  for (let privateKey = 2; privateKey < phiOfN; ++privateKey) {
    if (isCoPrime(privateKey, N) && isCoPrime(privateKey, phiOfN)) {
      return privateKey;
    }
  }

  console.log("Private key can't be generated.");
  return 0;
}

function generatePublicKey(privateKey) {
  while (privateKey) {
    if ((publicKey * privateKey) % phiOfN === 1 && privateKey !== publicKey) {
      return;
    }
    ++publicKey;
  }

  console.log("Public key can't be generated.");
}

function generateSignature(hashValue, privateKey) {
  return Math.pow(hashValue, privateKey) % N;
}

function decryptSignature(digitalSignature) {
  return Math.pow(digitalSignature, publicKey) % N;
}

function sendMsgToBob(message) {
  const privateKey = generatePrivateKey();
  generatePublicKey(privateKey);
  const hashValue = hashTheMessage(message);
  const generatedSignature = generateSignature(hashValue, privateKey);
  sendAndVerify(generatedSignature, message);
}

function sendAndVerify(digitalSignature, message) {
  const hashValue = hashTheMessage(message);
  const decryptedSignature = decryptSignature(digitalSignature);
  if (hashValue === decryptedSignature) {
    console.log("Success! Data is intact and signature is verified.");
  } else {
    console.log("Failure! There's something wrong with data or signature.");
  }
}

/*
Call the `sendMsgToBob()` function and pass it a super secret message as a string.
 
Observe the output of `console.log`.
*/
