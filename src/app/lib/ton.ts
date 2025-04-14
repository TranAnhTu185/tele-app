import { TonClient, WalletContractV4, internal } from '@ton/ton';
import { mnemonicToWalletKey } from '@ton/crypto';
import { toNano } from '@ton/core';

export async function sendTonTransaction() {
  // 1. Tạo client kết nối tới mạng testnet
  const client = new TonClient({ endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC' });

  // 2. Dùng mnemonic tạo keypair
  const mnemonics = ['your', '12', 'word', 'mnemonic', 'goes', 'here', '...'];
  const key = await mnemonicToWalletKey(mnemonics);

  console.log(key);

  // 3. Tạo wallet
  const wallet = WalletContractV4.create({
    workchain: 0,
    publicKey: key.publicKey,
  });

  const contract = client.open(wallet);

  // 4. Gửi giao dịch nội bộ (internal message)
  const seqno = await contract.getSeqno();

  await contract.sendTransfer({
    secretKey: key.secretKey,
    seqno,
    messages: [
      internal({
        to: '0QBngP-cJUrnfAjKYd4rOuBeYCO7VXdyv0c_h40GO6zRzuCH', // địa chỉ nhận
        value: toNano(1), // số TON gửi
        body: 'Hello from TON!',
      }),
    ],
  });

  console.log('Giao dịch đã gửi!');
}