import React, { useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const Fingerprint = async () => {
    // We recommend to call `load` at application startup.
    const fp = await FingerprintJS.load();
  
    // The FingerprintJS agent is ready.
    // Get a visitor identifier when you'd like to.
    const result = await fp.get();
  
    // This is the visitor identifier:
    const visitorId = result.visitorId;
    console.log(visitorId);
}

export default Fingerprint