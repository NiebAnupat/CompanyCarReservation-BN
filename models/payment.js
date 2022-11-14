class payment{

    _PM_ID = null;
    _PM_IMG = null;
    _PM_AMOUNT = null;
    _PM_TIME = null;
    _PM_NOTE = null;
    _PM_STATUS = null;
    _EM_ID = null;


    get PM_ID() {
        return this._PM_ID;
    }

    set PM_ID( value ) {
        this._PM_ID = value;
    }

    get PM_IMG() {
        return this._PM_IMG;
    }

    set PM_IMG( value ) {
        this._PM_IMG = value;
    }

    get PM_AMOUNT() {
        return this._PM_AMOUNT;
    }

    set PM_AMOUNT( value ) {
        this._PM_AMOUNT = value;
    }

    get PM_TIME() {
        return this._PM_TIME;
    }

    set PM_TIME( value ) {
        this._PM_TIME = value;
    }

    get PM_NOTE() {
        return this._PM_NOTE;
    }

    set PM_NOTE( value ) {
        this._PM_NOTE = value;
    }

    get PM_STATUS() {
        return this._PM_STATUS;
    }

    set PM_STATUS( value ) {
        this._PM_STATUS = value;
    }

    get EM_ID() {
        return this._EM_ID;
    }

    set EM_ID( value ) {
        this._EM_ID = value;
    }
}

module.exports = payment;
