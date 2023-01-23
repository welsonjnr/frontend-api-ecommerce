import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ChartBarIcon, BriefcaseIcon, DocumentArrowUpIcon, BookmarkSquareIcon, BanknotesIcon} from '@heroicons/react/20/solid'
import {ComputerDesktopIcon as IconDetail}  from '@heroicons/react/20/solid'
import {TrashIcon as IconDelete}  from '@heroicons/react/20/solid'
import {DocumentTextIcon as IconEdit}  from '@heroicons/react/20/solid'
// import {DocumentMagnifyingGlassIcon as Icon}  from '@heroicons/react/20/solid'
// import {PaperAirplaneIcon as Icon}  from '@heroicons/react/20/solid'
// import {ComputerDesktopIcon as Icon}  from '@heroicons/react/20/solid'
// import {Cog8ToothIcon as Icon}  from '@heroicons/react/20/solid'
// import {Bars3BottomRightIcon as Icon}  from '@heroicons/react/20/solid'

export default function App() {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/ecommerce/sale/page")
            .then(res => res.json())
            .then(dados => setSales(dados.content.reverse()))
    }, [])

    function refresh() {
        fetch("http://localhost:8080/ecommerce/sale/page")
            .then(res => res.json())
            .then(dados => setSales(dados.content.reverse()))
    }


    return (
        <div className="flex flex-col">
            <button type="button"
                onClick={() => refresh()}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 hover:bg-blue-800 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm mt-3 mr-3 mb-3">
                Recarregar
            </button>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Cliente
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Qtde Produto
                                    </th>
                                    <th
                                        scope="col"
                                        className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Preço Total
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-9 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Data
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-9 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th scope="col" className="relative px-3 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sales?.map(sale => (
                                    <tr key={sale.idSale}>


                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="text-sm font-medium text-gray-900">{sale.idSale}</div>
                                                </div>
                                            </div>
                                        </td>


                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="text-sm font-medium text-gray-900">{sale.client}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{sale.totalProducts}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {sale.amountSale}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {`${sale.dataSale[2]}/${sale.dataSale[1]}/${sale.dataSale[0]} ${("00" + sale.dataSale[3]).slice(-2)}:${("00" + sale.dataSale[4]).slice(-2)}`}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                            >
                                                {sale.saleStatus}
                                            </span>
                                        </td>

                                        <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">

                                            <Link to={`pedido/${sale.idSale}`} className="text-indigo-600 hover:text-indigo-900">
                                                <IconDetail className="h-8 w-10 flex-shrink-0 text-indigo-600 hover:text-indigo-900" aria-hidden="true" />
                                            </Link>
                                            
                                            <a className="px-2 py-4"/>
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                <IconEdit className="h-8 w-10 flex-shrink-0 text-indigo-600 hover:text-indigo-900" aria-hidden="true" />
                                            </a>
                                            <a className="px-2 py-4"/>
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                <IconDelete className="h-8 w-10 flex-shrink-0 text-indigo-600 hover:text-indigo-900" aria-hidden="true" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}