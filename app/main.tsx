import React from 'react'
import ReactDOM from 'react-dom/client'
import * as t from '@tonconnect/ui-react'
import { beginCell, toNano } from '@ton/core'

const root = document.getElementById('root') as HTMLElement

ReactDOM
  .createRoot(root)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

function WalletActions() {
  const [tonConnectUI] = t.useTonConnectUI()
  const wallet = t.useTonWallet()

  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const amount = 0.3
  const receiver = `UQC66pKa-6mINNx3VKC9tY68Vr_3Q2h6Ybzq-Ktbuv0_w9XM`

  const sendTon = async () => {
    // const receiver = wallet.account.address,

    const payload = encodePayload(`{"TgId": "1234567"}`)
    const validUntil = dateAddMinutes(5)

    const messages = [{
      address: receiver,
      amount: toNano(amount).toString(),
      payload: payload,
    }]

    await tonConnectUI.sendTransaction({validUntil, messages})
  }

  return (
    <>
      <div className="min-h-screen text-white" style={{background: 'rgb(26, 32, 38)'}}>
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <i className="tm-premium-opt-icon tm-premium-opt-icon-pay"></i>
            <h1 className="text-2xl font-semibold mb-5">Pay for Ads Manager Telegram Bot 🤖</h1>
            <p className="text text-gray-400 leading-relaxed">
              Use your crypto wallet to send toncoins to your
              <a href="https://t.me/adman_tg_bot" className="font-medium hover:underline mx-1" style={{color: '#4A90E2'}}>
                @adman_tg_bot
              </a>
              account.
            </p>
          </div>

          {/* Ads Manager Account Section */}
          {false &&
            <div className="mb-10">
              <h2 className="text-xl font-medium mb-2">Ads Manager account</h2>
              <div
                className="rounded-xl p-2 mb-10"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'}}>
                    IM
                  </div>
                  <div className="text-md font-medium">Account Name</div>
                </div>
              </div>
            </div>
          }

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-2">Amount</h2>
            <div className="mb-5">
              <div
                className="rounded-xl p-2 mb-10"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{
                      backgroundImage: 'url("./static/ton-symbol.svg")',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                    }}>
                  </div>
                  <div className="text-md font-medium">{amount}</div>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                This amount will be sent to the selected Ads Manager account. To learn more
                about the ways to obtain and store TON required for this transfer,
                <a href="https://wallet.tg/" className="font-medium hover:underline mx-1" style={{color: '#4A90E2'}}>
                  click here &gt;
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
          {
            wallet &&
            <button
                className="py-3 px-20 text text-white border-none rounded-xl cursor-pointer transition-all duration-300 mb-8"
                style={{
                  background: 'linear-gradient(45deg, #4A90E2 0%, #357abd 100%)'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setIsPressed(false);
                }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onClick={sendTon} >
                Send Funds
              </button>
          }
          <t.TonConnectButton className="text-center mb-8"/>
          </div>

          {/* Transaction History Link */}
          <div className="text-center">
            <a href={"https://tonviewer.com/"+receiver}
              className="text-base font-medium hover:underline"
              target="_blank"
              style={{color: '#4A90E2'}}>
              View Transactions History
            </a>
          </div>
        </div>
      </div>

      {
        <button
          className="w-full py-5 px-8 text-lg font-semibold text-white border-none rounded-xl cursor-pointer transition-all duration-300 mb-8"
          style={{
            background: isHovered && !isPressed
              ? 'linear-gradient(45deg, #357abd 0%, #2968a3 100%)'
              : 'linear-gradient(45deg, #4A90E2 0%, #357abd 100%)',
            transform: isHovered && !isPressed ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: isHovered && !isPressed ? '0 8px 25px rgba(74, 144, 226, 0.3)' : 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
          }}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onClick={sendTon}
        >
          SendPayment
        </button>
      }
    </>
  )
}

export default function App() {
  return (
    <t.TonConnectUIProvider manifestUrl="https://adman-tg.github.io/ton-connect/manifest.json">
      <WalletActions />
    </t.TonConnectUIProvider>
  )
}

function encodePayload(val) {
  return beginCell()
    .storeUint(0, 32)
    .storeStringTail(val)
    .endCell()
    .toBoc()
    .toString('base64')
}

function dateAddMinutes(val) {
  const now = Math.floor(Date.now() / 1000)
  return now + 60 * val
}
