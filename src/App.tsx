import { MainLayout } from "./components/layout/MainLayout";
import { Header } from "./components/layout/Header";
import { DialPad } from "./components/dialer/DialPad";
import { CallStatus } from "./components/call/CallStatus";
import { CallProvider, useCall } from "./context/CallContext";


const LiveTranscript = () => {
  const { transcript, status } = useCall();
  return (
    <div style={{ height: "400px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
      {transcript.length === 0 && <p style={{ color: "#999" }}>{status === 'CONNECTED' ? "Listening..." : "Waiting for call..."}</p>}
      {transcript.map((text, i) => (
        <div key={i} style={{ background: "#f0f7ff", padding: "10px", borderRadius: "8px", borderLeft: "4px solid #007bff", fontSize: "14px" }}>
          {text}
        </div>
      ))}
    </div>
  );
};

const AIInsightsPanel = () => {
  const { aiInsights, status } = useCall();
  if (status !== 'CONNECTED') return <p style={{ color: "#999", fontSize: "13px" }}>No active insights.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div>
        <label style={{ fontSize: "11px", color: "#666", fontWeight: "bold" }}>SENTIMENT</label>
        <div style={{
          color: aiInsights.sentiment === 'Positive' ? 'green' : aiInsights.sentiment === 'Negative' ? 'red' : 'orange',
          fontWeight: "bold", fontSize: "18px"
        }}>
          {aiInsights.sentiment}
        </div>
      </div>
      <div>
        <label style={{ fontSize: "11px", color: "#666", fontWeight: "bold" }}>KEYWORDS</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
          {aiInsights.keywords.map(kw => (
            <span key={kw} style={{ background: "#eee", padding: "2px 8px", borderRadius: "4px", fontSize: "12px" }}>{kw}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <MainLayout>
      <Header />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr 300px",
          gap: "20px",
          padding: "20px",
          minHeight: "calc(100vh - 80px)",
          background: "#f4f7f6"
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
              Dial Pad
            </h3>
            <DialPad />
          </div>

          <div style={{ background: "white", padding: "20px", borderRadius: "10px", flexGrow: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
              AI Insights Section
            </h3>
            <AIInsightsPanel />
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
            Live Transcript
          </h3>
          <LiveTranscript />
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
            Active Call Section
          </h3>
          <CallStatus />
        </div>
      </div>
    </MainLayout>
  );
}

export default function App() {
  return (
    <CallProvider>
      <AppContent />
    </CallProvider>
  );
}
