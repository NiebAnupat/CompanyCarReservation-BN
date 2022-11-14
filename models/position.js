class position{
    _P_ID = null;
    _P_NAME = null;
    _P_LEVEL = null;

    get P_ID() {
        return this._P_ID;
    }

    set P_ID( value ) {
        this._P_ID = value;
    }

    get P_NAME() {
        return this._P_NAME;
    }

    set P_NAME( value ) {
        this._P_NAME = value;
    }

    get P_LEVEL() {
        return this._P_LEVEL;
    }

    set P_LEVEL( value ) {
        this._P_LEVEL = value;
    }
}

module.exports = position;
