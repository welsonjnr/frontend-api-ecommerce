import ApiService from '../apiService'

export default class SalesService extends ApiService{

    constructor(){
        super()
    }

    findPageSales(){
        let params = `/ecommerce/sale/page`
        return this.get(params)
    }

    findById(id){
        let params = `/ecommerce/sale/${id}`
        return this.get(params)
    }

    postSale(sale){
        return this.post('/ecommerce/sale', sale)
    }

    delete(id){
        return this.delete(`/ecommerce/sale/${id}`)
    }

    updateStatusSale(sale){
        return this.put(`/ecommerce/sale/${sale.id}`, sale)
    }

    updateSale(sale){
        return this.put(`/ecommerce/sale/${sale.id}`, sale)
    }
}