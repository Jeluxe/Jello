import "./ContextMenu.css"

const ContextMenu = ({ id, setIsMenuOpen }: { id: string, setIsMenuOpen: any }) => {
  return (
    <div className="context-menu">
      <div className="context-menu-item" onClick={() => setIsMenuOpen(false)}>edit {id}</div>
      <div className="context-menu-item" onClick={() => setIsMenuOpen(false)}>delete {id}</div>
    </div>
  )
}

export default ContextMenu