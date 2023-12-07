import * as dotenv from 'dotenv';
import { hashMessage, recoverAddress } from 'ethers';

dotenv.config();

export const retrieveWalletAddressFromSig = (
  signature: string,
): string | undefined => {
  try {
    console.log('Retrieving wallet from signature...');
    return recoverAddress(
      hashMessage(process.env.SIGNATURE_MESSAGE),
      signature,
    );
  } catch (e) {
    console.error(e);
  }
};
