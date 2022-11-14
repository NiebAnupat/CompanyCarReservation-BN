class car{

    _C_ID = null;
    _C_NAME = null;
    _C_DESCRIPTION = null;
    _C_LEVEL = null;
    _C_STATUS = null;
    _car_img = null;
    

    constructor( C_ID, C_NAME, C_DESCRIPTION, C_LEVEL, C_STATUS, car_img ) {
        this._C_ID = C_ID;
        this._C_NAME = C_NAME;
        this._C_DESCRIPTION = C_DESCRIPTION;
        this._C_LEVEL = C_LEVEL;
        this._C_STATUS = C_STATUS;
        this._car_img = car_img;
    }

    get C_ID() {
        return this._C_ID;
    }

    set C_ID( value ) {
        this._C_ID = value;
    }

    get C_NAME() {
        return this._C_NAME;
    }

    set C_NAME( value ) {
        this._C_NAME = value;
    }

    get C_DESCRIPTION() {
        return this._C_DESCRIPTION;
    }

    set C_DESCRIPTION( value ) {
        this._C_DESCRIPTION = value;
    }

    get C_LEVEL() {
        return this._C_LEVEL;
    }

    set C_LEVEL( value ) {
        this._C_LEVEL = value;
    }

    get C_STATUS() {
        return this._C_STATUS;
    }

    set C_STATUS( value ) {
        this._C_STATUS = value;
    }

    get car_img() {
        return this._car_img;
    }

    set car_img( value ) {
        this._car_img = value;
    }
}

module.exports = car;
