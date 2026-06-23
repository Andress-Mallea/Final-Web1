const Sidebar = () => {
  return (
    <aside style={{ width: '250px', borderRight: '1px solid #ccc', height: '100vh' }}>
      <h2>DeviantClone</h2>
      <nav>
        <ul>
          <li><button onClick={() => console.log("Cargando Hub...")}>Hub Principal</button></li>
          <li><button onClick={() => console.log("Cargando Siguiendo...")}>Siguiendo</button></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;