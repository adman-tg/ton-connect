import React from 'react'
import ReactDOM from 'react-dom/client'
import * as t from '@tonconnect/ui-react'
import { beginCell, fromNano } from '@ton/core'
import * as a from '@mitranim/js/all.mjs'

const root = document.getElementById('root') as HTMLElement

ReactDOM
  .createRoot(root)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

const RECEIVER = `UQDRMYLMkNv1fCOUN7gjPT9tcyn9CPGp-zXhM1zWgtghLgp7`

function WalletActions() {
  const url = new a.Url(window.location)

  const amount = url.query.get(`amount`)
  const ref    = url.query.get(`ref`)
  const descr  = url.query.get(`descr`)
  const title  = url.query.get(`title`)
  const image  = url.query.get(`image`)

  if (!amount || !ref) {
    return (
      <div className="min-h-screen text-white" style={{background: 'rgb(26, 32, 38)'}}>
        <div className="max-w-lg mx-auto text-center">
          <a href="https://t.me/adman_tg_bot" className="text-2xl font-semibold" style={{color: '#4A90E2'}}>
            @adman_tg_bot
          </a>
      </div>
    </div>
    )
  }

  const payload = encodePayload(JSON.stringify({ref}))

  const [tonConnectUI] = t.useTonConnectUI()
  const wallet = t.useTonWallet()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isPressed, setIsPressed] = React.useState(false)


  const sendTon = async () => {
    await tonConnectUI.sendTransaction({
      messages: [{
        address: RECEIVER,
        amount,
        payload,
      }],
      validUntil: dateAddMinutes(5),
    })
  }

  return (
    <>
      <div className="min-h-screen text-white" style={{background: 'rgb(26, 32, 38)'}}>
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-semibold mb-5">Pay for Adman — Ads Manager Bot 🤖</h1>
            <p className="text text-gray-400 leading-relaxed">
              Use your crypto wallet to send toncoins to your
              <a href="https://t.me/adman_tg_bot" className="font-medium hover:underline mx-1" style={{color: '#4A90E2'}}>
                @adman_tg_bot
              </a>
              account.
            </p>
          </div>

          {
            wallet &&
            <>
              {/* Ads Manager Account Section */}
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
                      style={{
                        background: 'url("' + image + '")',
                        backgroundSize: 'contain',
                      }}>
                    </div>
                    <div className="text-md font-medium">{title}</div>
                    —
                    <div className="text-md font-medium">{descr}</div>
                  </div>
                </div>
              </div>

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
                      <div className="text-md font-medium">{fromNano(amount)}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    This amount will be sent to the selected Ads Manager account. To learn more
                    about the ways to obtain and store TON required for this transfer,
                    <a href="https://wallet.tg/" className="font-medium hover:underline mx-1" style={{color: '#4A90E2'}}>
                      click&nbsp;here &gt;
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <button
                    className="py-3 px-20 text text-white border-none rounded-xl cursor-pointer transition-all duration-300 mb-8"
                    style={{
                      background: 'linear-gradient(45deg, #4A90E2 0%, #357abd 100%)'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                      setIsHovered(false)
                      setIsPressed(false)
                    }}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                    onClick={sendTon} >
                    Send Funds
                  </button>
              </div>
            </>
          }

          <div className="flex flex-col items-center">
            <t.TonConnectButton className="text-center mb-8"/>
          </div>

          {
            wallet &&
            <>
              {/* Transaction History Link */}
              <div className="text-center">
                <a href={"https://tonviewer.com/"+RECEIVER}
                  className="text-base font-medium hover:underline"
                  target="_blank"
                  style={{color: '#4A90E2'}}>
                  View Transactions History
                </a>
              </div>

            </>
          }
        </div>
      </div>
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
