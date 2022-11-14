class favorite{

    _F_ID = null;
    _EM_ID = null;
    _C_ID = null


    get F_ID() {
        return this._F_ID;
    }

    set F_ID( value ) {
        this._F_ID = value;
    }

    get EM_ID() {
        return this._EM_ID;
    }

    set EM_ID( value ) {
        this._EM_ID = value;
    }

    get C_ID() {
        return this._C_ID;
    }

    set C_ID( value ) {
        this._C_ID = value;
    }
}

module.exports = favorite;
