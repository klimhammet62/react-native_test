import { companiesAPI } from "../api/companiesAPI";
import { useAppDispatch } from "../hooks/redux";

const SET_COMPANIES = 'SET_COMPANIES'
const SELECT_COMPANY = 'SELECT_COMPANY'


const initialState = {
    companies: [],
    company: {},
}

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES:
            return {
                ...state,
                companies: action.companies,
            }

        case SELECT_COMPANY:
            return {
                ...state,
                company: action.company,
            }

        default:
            return state
    }
}

export const getCompanies = (text) => async (dispatch) => {
    const response = await companiesAPI.data(text)
    if (response) {
        dispatch(setCompanies(response))
    }
}

export const setCompanies = (companies) => {
    return {
        type: SET_COMPANIES,
        companies,
    }
}

export const selectCompany = (company) => {
    return {
        type: SELECT_COMPANY,
        company,
    }
}

export default companiesReducer