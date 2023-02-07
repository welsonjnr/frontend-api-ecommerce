import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function Pedido() {

    const { id } = useParams();
    const [sale, setSale] = useState()

    useEffect(() => {
        fetch(`http://localhost:8080/ecommerce/sale/${id}`)
            .then(res => res.json())
            .then(dados => setSale(dados))
    }, [])

    

    return (
        <>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"> 
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Pedido {id}</h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nome do Cliente</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{sale?.client}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Data pedido</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {`${sale?.dataSale[2]}/${sale?.dataSale[1]}/${sale?.dataSale[0]} ${("00" + sale?.dataSale[3]).slice(-2)}:${("00" + sale?.dataSale[4]).slice(-2)}`}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{sale?.saleStatus}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Total Produtos</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{sale?.totalProducts}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Total Pedido</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">R${sale?.amountSale}</dd>
                        </div>
                    </dl>
                </div>
                <div className="border-t border-gray-200"/>
            <div className="flex flex-col mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-4 mb-4">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Produto
                                        </th>
                                        <th
                                            scope="col"
                                            className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Quantidade
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Info
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {sale?.products?.map(prod => (

                                        <tr key={prod.id}>
                                            <td className="px-2 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{prod.product.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{prod.quantity}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {prod.info}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}