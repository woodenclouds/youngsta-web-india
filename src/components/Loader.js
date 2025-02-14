const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <style jsx>{`
                .loader {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: 0;
                    left: 0;
                    z-index: 9999;
                }
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border-left-color: #000;
                    animation: spin 1s infinite linear;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loader;
