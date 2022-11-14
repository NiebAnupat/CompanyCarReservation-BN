class car_img {

    _IMG_ID = null;
    _C_ID = null;
    _FileName = null;
    _IMG_FILE = null;


    get IMG_ID() {
        return this._IMG_ID;
    }

    set IMG_ID( value ) {
        this._IMG_ID = value;
    }

    get C_ID() {
        return this._C_ID;
    }

    set C_ID( value ) {
        this._C_ID = value;
    }

    get FileName() {
        return this._FileName;
    }

    set FileName( value ) {
        this._FileName = value;
    }

    get IMG_FILE() {
        return this._IMG_FILE;
    }

    set IMG_FILE( value ) {
        this._IMG_FILE = value;
    }
}

module.exports = car_img;
