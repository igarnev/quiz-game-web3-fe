import { useAccount, useConnect, useDisconnect } from "wagmi";

import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import metamaskLogo from "../../assets/metamask-logo.png";

import { MainTooltip } from "../../components/Tooltips/MainTooltip";

import InfoModal from "../../components/Modal/InfoModal";

import "./MetamaskPanel.scss";

export const MetamaskPanelComponent = () => {
  const account = useAccount();

  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="metamask-panel-container">
      <div className="flex-col account-container">
        <span className="account-title">Account info</span>

        <div className="flex-col account-info-container">
          <div>
            <span className="account-title">status:</span> {account.status}
          </div>
          <div>
            <span className="account-title">addresses:</span>{" "}
            {JSON.stringify(account.addresses) || "Not Connected!"}
          </div>
          <div>
            <span className="account-title">chainId:</span>{" "}
            {account.chainId || "Not Connected!"}
          </div>
        </div>
      </div>

      <div className="flex-col connect-container">
        <div>
          {account.status === "connected" && (
            <MainTooltip
              title="Logout from MetaMask"
              placement="left-end"
              color="primary"
            >
              <IconButton size="large" onClick={() => disconnect()}>
                <LogoutIcon sx={{ color: "#ffffff", fontSize: 40 }} />
              </IconButton>
            </MainTooltip>
          )}

          {account.status !== "connected" &&
            connectors
              .filter((connector) => connector.id === "io.metamask")
              .map((connector) => (
                <MainTooltip
                  key={connector.uid}
                  title="Connect to MetaMask"
                  placement="left-end"
                  color="primary"
                >
                  <IconButton
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                  >
                    <img key={connector.uid} src={metamaskLogo} height="40" />
                  </IconButton>
                </MainTooltip>
              ))}
        </div>
      </div>

      <InfoModal
        isOpen={!!error?.message}
        headerText="Connecting error has occurred!"
        contentText={error?.message || ""}
      ></InfoModal>
    </div>
  );
};

export default MetamaskPanelComponent;