import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseUnits, formatUnits } from "viem"
import { useState } from "react"
import { CONTRACTS, ADASHE_ABI, ERC20_ABI } from "./config/contracts"
import "./App.css"

const FAQS = [
  { q: "What is Adashe?", a: "Adashe is a rotating savings group. Members contribute USDC each cycle and one member receives the full pot." },
  { q: "How does rotation work?", a: "When all members join, the smart contract randomly assigns who receives the pot each cycle." },
  { q: "When do I get paid?", a: "Once ALL members contribute in a cycle, the pot is automatically released on-chain instantly." },
  { q: "Is my money safe?", a: "Funds are locked in a smart contract. Nobody can access the pot until all members contribute." },
  { q: "How do I contribute?", a: "Approve USDC spending first, then click Contribute. Both steps need your wallet signature only." },
]

function FAQ() {
  const [open, setOpen] = useState(-1)
  return (
    <div className="faq">
      <h2>FAQ</h2>
      {FAQS.map((f, i) => (
        <div className="faq-item" key={i} onClick={() => setOpen(open === i ? -1 : i)}>
          <div className="faq-q">{f.q}<span>{open === i ? "-" : "+"}</span></div>
          {open === i && <div className="faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  )
}

function GroupInfo() {
  const [groupId, setGroupId] = useState("1")
  const { data, isError, isLoading } = useReadContract({
    address: CONTRACTS.ADASHE as "0x${string}",
    abi: ADASHE_ABI,
    functionName: "getGroup",
    args: [BigInt(groupId)],
  })
  const group = data as [string, bigint, bigint, bigint, bigint, bigint, boolean] | undefined
  return (
    <div className="card">
      <h2>View Group Info</h2>
      <div className="form-group">
        <label>Group ID</label>
        <input type="number" value={groupId} min="1" onChange={e => setGroupId(e.target.value)} />
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p className="error">Group not found</p>}
      {group && (
        <div className="group-info">
          <p>Creator <span>{group[0].slice(0,6)}...{group[0].slice(-4)}</span></p>
          <p>Contribution <span>{formatUnits(group[1], 6)} USDC</span></p>
          <p>Cycle <span>{(Number(group[2]) / 86400).toFixed(0)} days</span></p>
          <p>Members <span>{group[4].toString()} / {group[3].toString()}</span></p>
          <p>Cycle No. <span>{group[5].toString()}</span></p>
          <p>Total Pot <span>{(Number(formatUnits(group[1], 6)) * Number(group[3])).toFixed(2)} USDC</span></p>
          <p>Status <span>{group[6] ? "Active" : "Waiting for members"}</span></p>
        </div>
      )}
      <FAQ />
    </div>
  )
}

function CreateGroup() {
  const [amount, setAmount] = useState("10")
  const [days, setDays] = useState("1")
  const [members, setMembers] = useState("3")
  const { writeContract, data: txHash, isPending } = useWriteContract()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: txHash })
  const handleCreate = () => {
    writeContract({
      address: CONTRACTS.ADASHE as "0x${string}",
      abi: ADASHE_ABI,
      functionName: "createGroup",
      args: [parseUnits(amount, 6), BigInt(Number(days) * 86400), BigInt(members)],
    })
  }
  return (
    <div className="card">
      <h2>Create Adashe Group</h2>
      <div className="form-group">
        <label>Contribution per cycle (USDC)</label>
        <input type="number" value={amount} min="1" onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Cycle duration (days)</label>
        <input type="number" value={days} min="1" onChange={e => setDays(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Max members</label>
        <input type="number" value={members} min="2" max="20" onChange={e => setMembers(e.target.value)} />
      </div>
      <p style={{color:"#888",fontSize:"0.85rem"}}>Total pot: <strong style={{color:"#a855f7"}}>{(Number(amount)*Number(members)).toFixed(2)} USDC</strong></p>
      <button onClick={handleCreate} disabled={isPending || isLoading}>
        {isPending ? "Confirm in wallet..." : isLoading ? "Creating..." : "Create Group"}
      </button>
      {(error || writeError) && <p className="error">{error || writeError?.message}</p>}
        {isSuccess && createdGroupId && (
          <div className="success">
            <p>Group created! Your Group ID is: <strong style={{color:"#a855f7",fontSize:"1.2rem"}}>{createdGroupId}</strong></p>
            <p style={{fontSize:"0.85rem"}}>Share this ID with members so they can join.</p>
            <button onClick={() => navigator.clipboard.writeText(createdGroupId)} style={{marginTop:"6px",padding:"6px 14px",background:"#a855f7",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer"}}>Copy Group ID</button>
            <a href="https://testnet.arcscan.app" target="_blank" rel="noopener noreferrer" style={{display:"block",marginTop:"8px"}}>View on ArcScan</a>
          </div>
        )}
    </div>
  )
}

function JoinGroup() {
  const [groupId, setGroupId] = useState("")
  const { writeContract, data: txHash, isPending } = useWriteContract()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: txHash })
  const handleJoin = () => {
    writeContract({
      address: CONTRACTS.ADASHE as "0x${string}",
      abi: ADASHE_ABI,
      functionName: "joinGroup",
      args: [BigInt(groupId)],
    })
  }
  return (
    <div className="card">
      <h2>Join Adashe Group</h2>
      <div className="form-group">
        <label>Group ID</label>
        <input type="number" value={groupId} placeholder="Enter group ID" onChange={e => setGroupId(e.target.value)} />
      </div>
      <button onClick={handleJoin} disabled={isPending || isLoading || !groupId}>
        {isPending ? "Confirm in wallet..." : isLoading ? "Joining..." : "Join Group"}
      </button>
      {isSuccess && <p className="success">Joined successfully! <a href="https://testnet.arcscan.app" target="_blank" rel="noopener noreferrer">View on ArcScan</a></p>}
    </div>
  )
}

function Contribute() {
  const [groupId, setGroupId] = useState("")
  const { writeContract: approve, data: approveTx, isPending: approving } = useWriteContract()
  const { writeContract: contribute, data: contributeTx, isPending: contributing } = useWriteContract()
  const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveTx })
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: contributeTx })
  const handleApprove = () => {
    approve({
      address: CONTRACTS.USDC as "0x${string}",
      abi: ERC20_ABI,
      functionName: "approve",
      args: [CONTRACTS.ADASHE as "0x${string}", parseUnits("1000", 6)],
    })
  }
  const handleContribute = () => {
    contribute({
      address: CONTRACTS.ADASHE as "0x${string}",
      abi: ADASHE_ABI,
      functionName: "contribute",
      args: [BigInt(groupId)],
    })
  }
  return (
    <div className="card">
      <h2>Contribute to Group</h2>
      <div className="form-group">
        <label>Group ID</label>
        <input type="number" value={groupId} placeholder="Enter group ID" onChange={e => setGroupId(e.target.value)} />
      </div>
      <div className="steps">
        <button onClick={handleApprove} disabled={approving || !groupId}>
          {approving ? "Approving..." : approveSuccess ? "Approved" : "1. Approve USDC"}
        </button>
        <button onClick={handleContribute} disabled={!approveSuccess || contributing || isLoading}>
          {contributing || isLoading ? "Contributing..." : "2. Contribute"}
        </button>
      </div>
      {isSuccess && <p className="success">Contributed! <a href="https://testnet.arcscan.app" target="_blank" rel="noopener noreferrer">View on ArcScan</a></p>}
    </div>
  )
}

export default function App() {
  const { isConnected, address } = useAccount()
  return (
    <div className="app">
      <div className="top-bar">
        <span className="logo">Adashe</span>
        <ConnectButton />
      </div>
      {isConnected ? (
        <>
          <div className="stats-bar">
            <div className="stat-card">
              <div className="label">Your Wallet</div>
              <div className="value" style={{fontSize:"0.9rem"}}>{address ? address.slice(0,6)+"..."+address.slice(-4) : ""}</div>
            </div>
            <div className="stat-card">
              <div className="label">Network</div>
              <div className="value" style={{fontSize:"0.9rem"}}>Arc Testnet</div>
            </div>
            <div className="stat-card">
              <div className="label">Contract</div>
              <div className="value" style={{fontSize:"0.75rem"}}>0x1109...Fa5A</div>
            </div>
          </div>
          <div className="reminder">
            <div className="reminder-icon">reminder</div>
            <div>
              <h3>Contribution Reminder</h3>
              <p>Check your active groups and contribute before the cycle ends. All members must contribute for the pot to be released.</p>
            </div>
          </div>
          <main>
            <GroupInfo />
            <CreateGroup />
            <JoinGroup />
            <Contribute />
          </main>
        </>
      ) : (
        <div className="hero">
          <h2>Welcome to Adashe</h2>
          <p>Decentralized rotating savings on Arc Testnet</p>
        </div>
      )}
      <footer>
        <a href="https://testnet.arcscan.app/address/0x1109529b99060520179eBCD94dd869bB3DAaFa5A" target="_blank" rel="noopener noreferrer">View Contract on ArcScan</a>
      </footer>
    </div>
  )
}