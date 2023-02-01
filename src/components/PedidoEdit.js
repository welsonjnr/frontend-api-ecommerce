import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { TrashIcon as IconDelete } from '@heroicons/react/20/solid'
import { useParams } from "react-router-dom";


export default function Pedidos() {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();
    const [client, setClient] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [info, setInfo] = useState("");
    const [productSale, setProductSale] = useState([]);
    const [idProduct, setIdProduct] = useState(0)
    const [price, setPrice] = useState(0)
    const [indexProducSale, setIndexProducSale] = useState(0)
    const [sale, setSale] = useState()

    const { id } = useParams();

    useEffect(() => {

        fetch("http://localhost:8080/ecommerce/product/page")
            .then(res => res.json())
            .then(dados => setProducts(dados.content))

            fetch(`http://localhost:8080/ecommerce/sale/${id}`)
            .then(res => res.json())
            // .then(dados => console.log(dados))
            .then(dados => setSale(dados))

            fetch(`http://localhost:8080/ecommerce/sale/${id}`)
            .then(res => res.json())
            .then(dados => setClient(dados.client))

            fetch(`http://localhost:8080/ecommerce/sale/${id}`)
            .then(res => res.json())
            .then(dados => createProductSaleForTable(dados.products))
            .then(dados => setProductSale(dados))
    }, [])

      function onChangeHandler(e) {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const idProduct =  el.getAttribute('id');
        const price =  el.getAttribute('price');
        setProduct(e.target.value)
        setIdProduct(idProduct)
        setPrice(price)
        setIndexProducSale(indexProducSale + 1)
      }

      function createProductSaleForTable(dados){
        let array = [];
        dados.map(function(productSale){
            let productSaleDTO = {
                indexProducSale : productSale.id,
                quantity: productSale.quantity,
                idProduct: productSale.product.id,
                nameProduct: productSale.product.name,
                priceSale: productSale.preco,
                info: productSale.info
            }
            array.push(productSaleDTO)
        })

        return array;
        }

       function createProductSale(){
         let productSaleDTO = {
             indexProducSale : indexProducSale,
             quantity: quantity,
             idProduct: idProduct,
             nameProduct: product,
             priceSale: price,
             info: info
         }

         if(validaProductSale(productSaleDTO)){
            setProductSale(prods => [...prods, productSaleDTO])
            clearStatesProductSale()
         }
       }

       function validaProductSale(productSale){
        if(productSale.quantity <= 0) {
            alert("Verifique o campo da quantidade")
            return false;
        }
        if(productSale.idProduct <= 0){
            alert("Verifique o produto")
            return false;
        }
        if(productSale.nameProduct === ""){
            alert("Verifique o produto")
            return false;
        }
        return true;
       }

       function validaSale(sale) {
        if(sale.nameClient === ""){
            alert("Verifique o nome do cliente")
            return false;
        }

        if(sale.products.length === 0){
            alert("Verifique o produtos selecionados")
            return false;
        }
        
        return true;
       }

       async function insertSale(){
            const newSale = {
                nameClient : client,
                products : productSale
            }
            
            if(validaSale(newSale)){
                try {
                    const res = await axios.put(`http://localhost:8080/ecommerce/sale/${id}`, newSale)
                    console.log(res.data)
                  } catch (e) {
                    alert(e)
                  }
            }
       }

       function removeProductSaleFromSale(prod){
        let indexProd = productSale.indexOf(prod)
        var myArray = productSale;
        var newArray = myArray.filter((item) => item.indexProducSale !== prod.indexProducSale);

        if (indexProd > -1 && productSale.length === 1) {
            setProductSale([]);
            console.log("Passou aqui 1")
          } else if(indexProd > -1 && productSale.length > 1){
            setProductSale(newArray);
            console.log("Passou aqui 2")
          }
       }

       function clearStatesProductSale(){
        setQuantity(0)
        setIdProduct(0)
        setProduct("Selecione")
        setInfo("")
        setPrice(0)
       }


    return (
        <>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>

            <div className="mt-5 md:col-span-2 md:mt-0">
            <form>
                {/* <form action="#" method="POST"> */}
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label htmlFor="name-client" className="block text-sm font-medium text-gray-700">
                                        Nome do Cliente
                                    </label>
                                    <input
                                        type="text"
                                        name="name-client"
                                        id="name-client"
                                        required
                                        value={client}
                                        onChange={e => setClient(e.target.value)}
                                        autoComplete="given-name"
                                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                                    />
                                </div>

                                <div className="col-span-3 sm:col-span-3">
                                    <label htmlFor="Produto" className="block text-sm font-medium text-gray-700">
                                        Produtos
                                    </label>
                                    <select
                                        value={product} 
                                        onChange={e => onChangeHandler(e)}
                                        id="produto"
                                        name="produto"
                                        autoComplete="produto-name"
                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        
                                        {products?.map(prod => <option id={prod.id} price={prod.priceSale} key={prod.id}>{prod.nameProduct}</option>)}
                                        <option >Selecione</option>
                                    </select>
                                </div>

                                <div className="col-span-3 sm:col-span-3 lg:col-span-3">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                        Quantidade
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={quantity} 
                                        onChange={e => setQuantity(e.target.value)}
                                        id="quantity"
                                        autoComplete="address-level2"
                                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                                    />
                                </div>
                            </div>
                            <div className="col-span-6 sm:col-span-6 lg:col-span-2 mt-6">
                                <label htmlFor="info" className="block text-sm font-medium text-gray-700">
                                    Informacoes do pedido
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="info"
                                        name="info"
                                        value={info}
                                        onChange={e => setInfo(e.target.value)}
                                        rows={3}
                                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                                        placeholder="Adicionais/Ponto do hamburguer"
                                        defaultValue={''}
                                    />
                                </div>
                                
                            <div className="text-right sm:px-6 mt-2">
                                <button type="button"
                                onClick={createProductSale}
                                to={`/dashboard`}
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 hover:bg-blue-800 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ">                                     Adicionar produto
                                </button>
                            </div>
                                
                            </div>
                        </div>




        {/* Table */}
        <div className="flex flex-col">
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
                                        Produto
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Quantidade
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Preco
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Info
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productSale?.map(productSale => (
                                    <tr key={productSale.indexProducSale}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{productSale.nameProduct}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{productSale.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5
                        font-semibold rounded-full bg-green-100 text-green-800"
                                            >
                                                {productSale.priceSale}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {productSale.info}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <IconDelete className="h-8 w-10 flex-shrink-0 text-indigo-600 hover:text-indigo-900" 
                                                aria-hidden="true"
                                                onClick={() => removeProductSaleFromSale(productSale)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>




{/* Botoes */}
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 mt-5">
                            <button
                                onClick={insertSale}
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                                Salvar
                            </button>

                            <Link to={`/dashboard`}>
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm mr-4">
                                    Cancelar
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>


            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </>
    )
}