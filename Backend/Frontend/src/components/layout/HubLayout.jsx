import Sidebar from './Sidebar';
const HubLayout = ({ children }) => {
  return (
    <div className="hub-container" style={{ display: 'flex' }}>
      <Sidebar />
      <main className="hub-content" style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};

export default HubLayout;