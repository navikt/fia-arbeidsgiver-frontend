"use client";

export default function Demobanner() {
	if (window.location.hostname.includes("localhost") || window.location.hostname.includes("dev.nav.no")) {
		return (
			<div style={{
				width: '100%',
				height: '2.5rem',
				backgroundColor: "var(--a-red-800)",
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<div style={{
					color: '#ffffff',
				}}><b style={{ fontSize: "1.5rem", marginRight: "0.25rem" }}>Demoutgave:</b> Dette er en demoside for å teste ut ny funksjonalitet. Den skal ikke brukes med ekte virksomheter.</div>
			</div>
		);
	}

	return null;
}