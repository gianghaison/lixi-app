import { getAllChildren, setActiveChild } from '../../services/storage';
import type { Child } from '../../types';

interface ChildSelectorProps {
  activeChild: Child;
  onChildChange: () => void;
}

export default function ChildSelector({ activeChild, onChildChange }: ChildSelectorProps) {
  const children = getAllChildren();

  if (children.length <= 1) {
    return (
      <div className="flex items-center gap-3 px-4 py-2">
        <span className="text-3xl">{activeChild.avatar}</span>
        <span className="text-xl font-bold text-gray-800">{activeChild.name}</span>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveChild(e.target.value);
    onChildChange();
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-3xl">{activeChild.avatar}</span>
      <select
        value={activeChild.id}
        onChange={handleChange}
        className="text-xl font-bold text-gray-800 bg-transparent border-none focus:outline-none cursor-pointer pr-6 appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: '20px',
        }}
      >
        {children.map((child) => (
          <option key={child.id} value={child.id}>
            {child.avatar} {child.name}
          </option>
        ))}
      </select>
    </div>
  );
}
