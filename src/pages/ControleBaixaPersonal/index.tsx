import { useState } from 'react'
import { FileDown, Search, RefreshCw, Filter, FileEdit, Receipt, FileSpreadsheet } from 'lucide-react'

interface GridData {
  id: number
  documentoFiscal: string
  tipoDocumento: string
  pedidoCompra: string
  baixaTotvs: string
  competencia: string
  valor: number
  status: string
}

export default function PersonalFreight() {
  const [selectedFilter, setSelectedFilter] = useState('NR DOCUMENTO FISCAL')
  const [competenciaInicial, setCompetenciaInicial] = useState('')
  const [competenciaFinal, setCompetenciaFinal] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // Sample data - replace with actual data from your API
  const gridData: GridData[] = [
    {
      id: 1,
      documentoFiscal: 'NF-001',
      tipoDocumento: 'NF',
      pedidoCompra: 'PC-001',
      baixaTotvs: 'BX-001',
      competencia: '2024-01',
      valor: 1500.00,
      status: 'Ativo'
    },
    // Add more sample data as needed
  ]

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(gridData.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700 mb-4">Controle de Baixas - Personal Freight</h1>
        
        {/* Navigation Links */}
        <div className="flex gap-4 mb-6">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Baixas Personal Freight
          </button>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Comparar Relatórios
          </button>
        </div>

        {/* Export Button */}
        <div className="flex justify-end mb-4">
          <button className="bg-navy-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-navy-800">
            <FileDown className="h-4 w-4" />
            Exportar Grid - CSV
          </button>
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option>NR DOCUMENTO FISCAL</option>
            <option>TIPO DOCUMENTO</option>
            <option>STATUS</option>
          </select>

          <input
            type="date"
            value={competenciaInicial}
            onChange={(e) => setCompetenciaInicial(e.target.value)}
            placeholder="Competência Inicial"
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            value={competenciaFinal}
            onChange={(e) => setCompetenciaFinal(e.target.value)}
            placeholder="Competência Final"
            className="border rounded px-3 py-2"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="bg-navy-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-navy-800">
            <Search className="h-4 w-4" />
            Consultar
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-600">
            <RefreshCw className="h-4 w-4" />
            Limpar Filtro
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
            <Filter className="h-4 w-4" />
            Filtro Avançado
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
            <Receipt className="h-4 w-4" />
            Criar Pedido Compra (TOTVS)
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700">
            <Receipt className="h-4 w-4" />
            Estornar NF/ND (TOTVS)
          </button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-700">
            <FileEdit className="h-4 w-4" />
            Editar Informações
          </button>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">
                  <input 
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedItems.length === gridData.length}
                    className="rounded"
                  />
                </th>
                <th className="border p-2 text-left">Nº DOCUMENTO FISCAL</th>
                <th className="border p-2 text-left">TIPO DOCUMENTO FISCAL</th>
                <th className="border p-2 text-left">PEDIDO DE COMPRA</th>
                <th className="border p-2 text-left">BAIXA TOTVS</th>
                <th className="border p-2 text-left">COMPETÊNCIA (EMISSÃO DOC FISCAL)</th>
                <th className="border p-2 text-left">VALOR</th>
                <th className="border p-2 text-left">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {gridData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(row.id)}
                      onChange={() => handleSelectItem(row.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="border p-2">{row.documentoFiscal}</td>
                  <td className="border p-2">{row.tipoDocumento}</td>
                  <td className="border p-2">{row.pedidoCompra}</td>
                  <td className="border p-2">{row.baixaTotvs}</td>
                  <td className="border p-2">{row.competencia}</td>
                  <td className="border p-2">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(row.valor)}
                  </td>
                  <td className="border p-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

