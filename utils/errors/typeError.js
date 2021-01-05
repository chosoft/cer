function knowType(err,arrayOk){
    if(err === '' || err === undefined || err === null){
        return 'unexpected'
    }else{
        let oks = []
        for (let i = 0; i < arrayOk.length; i++) {
            if(err === arrayOk[i]){
                oks.push(arrayOk[i])
                break
            }else{

            }
        }
        if(oks.length <= 0){
            return 'serverError'
        }else{
            return oks[0]
        }
    }
}

module.exports = knowType