class reservation{

    _R_ID = null;
    _R_DESCRIPTION = null;
    _C_ID = null;
    _R_TIME_BOOK = null;
    _R_TIME_RETURN = null;
    _EM_ID = null;
    _R_STATUS = null;
    _R_IS_RETURN = null;
    _R_Admin_Note = null;
    _R_TIME_RETURNED = null;


    get R_ID() {
        return this._R_ID;
    }

    set R_ID( value ) {
        this._R_ID = value;
    }

    get R_DESCRIPTION() {
        return this._R_DESCRIPTION;
    }

    set R_DESCRIPTION( value ) {
        this._R_DESCRIPTION = value;
    }

    get C_ID() {
        return this._C_ID;
    }

    set C_ID( value ) {
        this._C_ID = value;
    }

    get R_TIME_BOOK() {
        return this._R_TIME_BOOK;
    }

    set R_TIME_BOOK( value ) {
        this._R_TIME_BOOK = value;
    }

    get R_TIME_RETURN() {
        return this._R_TIME_RETURN;
    }

    set R_TIME_RETURN( value ) {
        this._R_TIME_RETURN = value;
    }

    get EM_ID() {
        return this._EM_ID;
    }

    set EM_ID( value ) {
        this._EM_ID = value;
    }

    get R_STATUS() {
        return this._R_STATUS;
    }

    set R_STATUS( value ) {
        this._R_STATUS = value;
    }

    get R_IS_RETURN() {
        return this._R_IS_RETURN;
    }

    set R_IS_RETURN( value ) {
        this._R_IS_RETURN = value;
    }

    get R_Admin_Note() {
        return this._R_Admin_Note;
    }

    set R_Admin_Note( value ) {
        this._R_Admin_Note = value;
    }

    get R_TIME_RETURNED() {
        return this._R_TIME_RETURNED;
    }

    set R_TIME_RETURNED( value ) {
        this._R_TIME_RETURNED = value;
    }
}

module.exports = reservation;
