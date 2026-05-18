import { useState } from "react";

const faqs = [
  { question: "What is Adashe?", answer: "Adashe is a decentralized rotating savings platform built on the Arc Testnet. It digitizes the traditional communal savings system where a group of trusted members contribute a fixed amount regularly, and each member takes turns receiving the full pot." },
  { question: "How does a rotating savings group work?", answer: "Each member contributes a fixed amount every cycle. The total pot is released to one member per cycle, rotating through all members until everyone has received the pot once. The cycle then resets or ends depending on the group settings." },
  { question: "How do I create a group?", answer: "Connect your wallet, then click Create Group. You will set the group name, contribution amount, number of members, and cycle duration. Once created, you can invite others to join using your group ID." },
  { question: "How do I join an existing group?", answer: "Click Join Group and enter the group ID shared by the group creator. Make sure your wallet is connected and you have enough funds to cover the contribution amount before joining." },
  { question: "When can I contribute?", answer: "Contributions are accepted within the active contribution window of each cycle. You will see a reminder at the top of the page when a contribution is due. All members must contribute before the pot is released." },
  { question: "What happens if a member does not contribute?", answer: "The pot will not be released until all members have contributed for the current cycle. Members are encouraged to contribute on time to keep the group running smoothly." },
  { question: "Is Adashe secure?", answer: "Adashe runs on a smart contract deployed on the Arc Testnet. All contributions and payouts are handled on-chain, meaning no single person controls the funds — the contract enforces the rules automatically." },
  { question: "Which wallet do I need?", answer: "You need a Web3-compatible wallet such as MetaMask connected to the Arc Testnet. Make sure you have testnet funds before interacting with any group." },
  { question: "Can I leave a group once I have joined?", answer: "Leaving a group mid-cycle depends on the group smart contract rules. In most cases, once you have joined and a cycle has started, you are committed to that cycle. Please review group terms before joining." },
  { question: "Where can I verify transactions?", answer: "All transactions are publicly visible on ArcScan. You can click the View Contract on ArcScan link on the homepage to inspect the smart contract and all on-chain activity." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => { setOpenIndex(openIndex === index ? null : index); };
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Frequently Asked Questions</h2>
      <p style={styles.subheading}>Everything you need to know about Adashe</p>
      <div style={styles.list}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.item}>
            <button style={styles.question} onClick={() => toggle(index)} aria-expanded={openIndex === index}>
              <span>{faq.question}</span>
              <span style={styles.icon}>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div style={styles.answer}>
                <p style={styles.answerText}>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  section: { maxWidth: "760px", margin: "60px auto", padding: "0 24px 60px" },
  heading: { fontSize: "2rem", fontWeight: 700, color: "#a855f7", marginBottom: "8px", textAlign: "center" },
  subheading: { fontSize: "1rem", color: "#a855f7", textAlign: "center", marginBottom: "40px", opacity: 0.75 },
  list: { display: "flex", flexDirection: "column", gap: "12px" },
  item: { borderRadius: "10px", border: "1px solid #2d2d2d", backgroundColor: "#111", overflow: "hidden" },
  question: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", color: "#a855f7", fontSize: "1rem", fontWeight: 600, textAlign: "left", gap: "12px" },
  icon: { fontSize: "1.4rem", color: "#a855f7", flexShrink: 0 },
  answer: { padding: "0 20px 18px", borderTop: "1px solid #2d2d2d" },
  answerText: { margin: "14px 0 0", color: "#ffffff", fontSize: "0.95rem", lineHeight: "1.7" },
};
