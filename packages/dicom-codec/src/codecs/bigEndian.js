const local = {
  // assign it and prevent initialization
  codec: undefined,
  Decoder: undefined,
  Encoder: undefined,
  decoderName: "codec big endian",
  encoderName: "codec big endian",
};

async function decode(compressedImageFrame, previousImageInfo) {
  // big endian Package has different usage of decode.
  // Use getPixelData in case pixelData is needed.
  throw Error(
    "Decoder not found or not applied for codec:" + local.encoderName
  );
}

async function encode(uncompressedImageFrame, previousImageInfo, options = {}) {
  // Use getPixelData in case pixelData is needed.
  throw Error(
    "Encoder not found or not applied for codec:" + local.encoderName
  );
}

function getPixelData(imageFrame, frameInfo) {
  let result;
  const { bitsAllocated, pixelRepresentation } = frameInfo;

  if (bitsAllocated === 16) {
    let arrayBuffer = pixelData.buffer;

    let offset = pixelData.byteOffset;
    const length = pixelData.length;
    // if pixel data is not aligned on even boundary, shift it so we can create the 16 bit array
    // buffers on it

    if (offset % 2) {
      arrayBuffer = arrayBuffer.slice(offset);
      offset = 0;
    }

    if (pixelRepresentation === 0) {
      result = new Uint16Array(arrayBuffer, offset, length / 2);
    } else {
      result = new Int16Array(arrayBuffer, offset, length / 2);
    }
    // Do the byte swap
    for (let i = 0; i < result.length; i++) {
      result[i] = swap16(result[i]);
    }
  } else if (bitsAllocated === 8) {
    result = imageFrame;
  }

  return result;
}

exports.decode = decode;
exports.encode = encode;
exports.getPixelData = getPixelData;
