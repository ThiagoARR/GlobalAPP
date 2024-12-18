import { useState, useEffect } from 'react'
import { DollarSign, SquarePen, Home, Package, Handshake, Percent, Landmark, ChevronDown, ChevronRight, FileText, BarChart3, Settings, HardHat, Bell, Menu, Search } from 'lucide-react'
import axios from 'axios';

const submenuTransition = "transition-all duration-300 linear max-h-0 overflow-hidden";

type NavItem = {
    NAME: string;
    ICON?: React.ElementType;
    SUBITEMS?: NavItem[];
}

const iconMap: { [key: string]: React.ElementType } = {
    DollarSign, SquarePen, Home, Package, Handshake, Percent, Landmark, FileText, BarChart3, Settings, HardHat
};

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  
  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const response = await axios.get('https://localhost:7288/itemMenu', {
          headers: {
            'accept': '*/*',
            'X-API-KEY': 'f8f8133b-4c59-4ae2-9c1b-8e1b73aa8664',
          },
        });

        const processedItems = response.data.map((item: NavItem) => ({
          ...item,
          ICON: iconMap[item.ICON as string] || Home
        }));

        setNavItems(processedItems);
      } catch (error: any) {
        console.error('Error fetching item menu:', error.response?.data || error.message);
      }
    };

    fetchNavItems();
  }, []);

  const toggleExpand = (itemPath: string) => {
    setExpandedItems(prev => 
      prev.includes(itemPath) ? prev.filter(i => i !== itemPath) : [...prev, itemPath]
    )
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const renderNavItem = (item: NavItem, path: string = '', level: number = 0) => {
    const currentPath = path ? `${path}.${item.NAME}` : item.NAME
    const isExpanded = expandedItems.includes(currentPath)
    const hasSubitems = item.SUBITEMS && item.SUBITEMS.length > 0

    return (
      <div key={currentPath}>
        <button
          onClick={() => hasSubitems && toggleExpand(currentPath)}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg ${
            item.NAME === 'Dashboard' && level === 0 ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
          } ${isCollapsed && level === 0 ? 'justify-center' : ''}`}
          style={{ paddingLeft: isCollapsed ? '0.75rem' : `${(level + 1) * 0.75}rem` }}
        >
          <div className="flex items-center">
            {item.ICON && <item.ICON className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />}
            {!isCollapsed && item.NAME}
          </div>
          {!isCollapsed && hasSubitems && (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          )}
        </button>
        {hasSubitems && (
          <div 
            className={`space-y-1 bg-gray-100 ${submenuTransition} ${
              isExpanded ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            {item.SUBITEMS!.map(subitem => renderNavItem(subitem, currentPath, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} border-r bg-white overflow-y-auto flex-shrink-0`}>
        {/* Logo and Hamburger */}
        <div className="space-y-1 p-5">
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-3">
          {navItems.map(item => renderNavItem(item))}
        </nav>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex-1 flex items-center">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="flex items-center">
              <span className="ml-2 text-sm font-medium text-gray-700">Tom Cook</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {/* Add your page content here */}
          <div className="space-y-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Content Section {i + 1}</h2>
                <p>This is some sample content to demonstrate scrolling.</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Sidebar;

