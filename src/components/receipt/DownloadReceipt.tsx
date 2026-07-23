import { TransactionStatus } from "../../data/types/userTransactionsTypes";
import { formatPrice } from "../../data/utils";

export type DownloadReceiptRow = {
  label: string;
  value?: string | number | null;
};

type DownloadReceiptProps = {
  title: string;
  amount: number;
  status: TransactionStatus;
  reference?: string | null;
  rows: DownloadReceiptRow[];
};

const statusLabels: Record<TransactionStatus, string> = {
  0: "Pending",
  1: "Completed",
  2: "Failed",
};

const statusColors: Record<TransactionStatus, string> = {
  0: "#B7791F",
  1: "#5F9823",
  2: "#C53030",
};

const DownloadReceipt = ({
  title,
  amount,
  status,
  reference,
  rows,
}: DownloadReceiptProps) => (
  <div
    style={{
      width: "680px",
      boxSizing: "border-box",
      backgroundColor: "#FFFFFF",
      color: "#111827",
      padding: "48px",
      fontFamily: "Arial, Helvetica, sans-serif",
    }}
  >
    <div
      style={{
        paddingBottom: "28px",
        borderBottom: "2px solid #79B833",
        textAlign: "center",
      }}
    >
      <img
        src="/logo.png"
        alt="Adron Homes"
        style={{
          display: "block",
          width: "150px",
          height: "auto",
          margin: "0 auto 22px",
          objectFit: "contain",
        }}
      />
      <div
        style={{
          color: "#6B7280",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: "12px",
          fontSize: "34px",
          lineHeight: 1.2,
          fontWeight: 700,
        }}
      >
        {formatPrice(amount)}
      </div>
      <div
        style={{
          display: "inline-block",
          marginTop: "14px",
          border: `1px solid ${statusColors[status]}`,
          borderRadius: "999px",
          padding: "7px 16px",
          color: statusColors[status],
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        {statusLabels[status]}
      </div>
    </div>

    <div style={{ paddingTop: "12px" }}>
      {rows
        .filter(({ value }) => value !== undefined && value !== null && value !== "")
        .map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "grid",
              gridTemplateColumns: "190px minmax(0, 1fr)",
              columnGap: "24px",
              alignItems: "start",
              padding: "17px 0",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                color: "#6B7280",
                fontSize: "13px",
                lineHeight: 1.5,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
            <div
              style={{
                minWidth: 0,
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                color: "#111827",
                fontSize: "14px",
                lineHeight: 1.55,
                fontWeight: 700,
                textAlign: "right",
              }}
            >
              {value}
            </div>
          </div>
        ))}
    </div>

    <div
      style={{
        paddingTop: "26px",
        color: "#9CA3AF",
        fontSize: "11px",
        lineHeight: 1.6,
        textAlign: "center",
      }}
    >
      <div>Thank you for choosing Adron Homes.</div>
      {reference && <div style={{ marginTop: "4px" }}>Reference: {reference}</div>}
    </div>
  </div>
);

export default DownloadReceipt;
