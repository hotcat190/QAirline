import { FaSync } from "react-icons/fa";

import { LoadState } from "types/states/LoadState";

import styles from "./RefreshButton.module.css";

export default function RefreshButton({ onRefresh, loadState }) {
    return (
        <button 
            className={styles.refreshButton}
            onClick={onRefresh}
            disabled={loadState === LoadState.LOADING}
        >
            <FaSync className={loadState === LoadState.LOADING ? styles.spinning : ''} />
            Refresh
        </button>
    )
}