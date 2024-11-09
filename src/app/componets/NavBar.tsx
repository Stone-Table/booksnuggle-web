import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-[#111111] p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            <a className="text-white hover:text-gray-400">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/mybooks">
            <a className="text-white hover:text-gray-400">My Books</a>
          </Link>
        </li>
        <li>
          <Link href="/doubleplay">
            <a className="text-white hover:text-gray-400">Double Play</a>
          </Link>
        </li>
        <li>
          <Link href="/playbook">
            <a className="text-white hover:text-gray-400">Playbook</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}