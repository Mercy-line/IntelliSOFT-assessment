const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-500 text-white font-serif p-6">
      <h2 className="font-serif mb-6">Register Patient</h2>

      <ul className="space-y-4">
        <li>Patient Vitals</li>
        <li>Overweight Assessment</li>
        <li>General Assessment</li>
        <li>Patient Listing</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
