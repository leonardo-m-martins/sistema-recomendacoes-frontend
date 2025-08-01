import backgroundImage from "../assets/bookshelf.jpg"

export function BackgroundBookshelf({children }) {
  return (
    <div
      className="h-screen bg-cover bg-fixed bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
}
