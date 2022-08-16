import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import { InputAdornment, TextField } from "@mui/material";
import styles from "../../styles/search.scss"
import { useState } from 'react';

const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
    return (
        <TextField
            {...props}
            InputProps={{
                ...InputProps,
                startAdornment: iconStart ? (
                    <InputAdornment position="start">{iconStart}</InputAdornment>
                ) : null,
                endAdornment: iconEnd ? (
                    <InputAdornment position="end">{iconEnd}</InputAdornment>
                ) : null
            }}
        />
    );
};



const DropdownConfig = (props) => {
    var curUserStatus = props.initDataSearch.blockStatus || null;
    var curPostStatus = props.initDataSearch.postStatus || null;

    // className={curUserStatus === "Blocked" ? "dropdown-item config-focus" : "dropdown-item"}
    function filterBlock(status) {
        curUserStatus = status
        // setCurUserStatus(status)
        props.search({
            statusEQ: status,
            statusBlock: curPostStatus
        })

    }

    function filterResolved(status) {
        curPostStatus = status;
        // setCurPostStatus(status)
        props.search({
            statusEQ: curUserStatus,
            statusBlock: status
        })

    }
    return (
        <div className={props.open ? "config-dropdown dropdown position-absolute" : "d-none"} >
            {
                props.flag == 1 ?
                    <div>
                        <a className="dropdown-item" aria-current={curUserStatus === "Blocked"} href="#" onClick={()=>filterBlock("Blocked")}>Blocked</a>
                        <a className="dropdown-item" aria-current={curUserStatus === "Unblocked"}  href="#" onClick={()=>filterBlock("Unblocked")}>Unblocked</a>
                        <a className="dropdown-item" aria-current={curUserStatus === "All"}  href="#" onClick={()=>filterBlock("All")}>All</a>
                    </div> :
                    <div>
                        <a className="dropdown-item" href="#" onClick={()=>filterResolved("Resolved")}>Resolved</a>
                        <a className="dropdown-item" href="#" onClick={()=>filterResolved("Unresolved")}>Unresolved</a>
                        <a className="dropdown-item" href="#" onClick={()=>filterResolved("All")}>All</a>
                    </div>
            }

        </div>
    )
}

const Search = ({onSearch}) => {
    const [openBlockFlag, setOpenBlockFlag] = useState(false)
    const [openPostFlag, setOpenPostFlag] = useState(false)

    const [statusEQ, setStatusEQ] = useState(null)
    const [statusBlock, setStatusBlock] = useState(null)

    const [tfValue, setTFValue] = useState("");

    function openBlockModal() {
        setOpenBlockFlag(!openBlockFlag)
    }

    function openPostModal() {
        setOpenPostFlag(!openPostFlag)
    }

    function closeDropDown() {
        setOpenBlockFlag(false)
        setOpenPostFlag(false)

    }

    function refDataFilter(data = {statusBlock: null, statusEQ: null, text: null }) {
       if(data.statusBlock === null) {
        setStatusEQ(data.statusEQ)
        onSearch({
            keyword: tfValue,
            statusEQ: data.statusEQ,
            statusBlock: statusBlock
    
        })
       } else if(data.statusEQ === null) {
        setStatusBlock(data.statusBlock)
        onSearch({
            keyword: tfValue,
            statusEQ: statusEQ,
            statusBlock: data.statusBlock
    
        })
       } else {
        onSearch({
            keyword: data.text,
            statusEQ: statusEQ,
            statusBlock: statusBlock
        })
       }

       closeDropDown()
    }

    return (
        <div className="search-bar p-3 mx-4 " >
            <IconTextField
                style={{ width: 500 }}
                variant="standard"
                placeholder="Filter by keyword "
                onChange={(newValue) => {console.log(newValue);setTFValue(newValue.target.value); refDataFilter({statusBlock: undefined, statusEQ: undefined, text: newValue.target.value})}}
                iconStart={<FilterListIcon />}
            />
            <div className="mr-6 dark d-flex align-items-center">
                <span className="pr-6" onClick={openBlockModal}>
                    User Status <ArrowDropDownIcon />
                    <DropdownConfig open={openBlockFlag} initDataSearch={{blockStatus: "blocked"}} search={refDataFilter} flag={1} />

                </span>
                <span onClick={openPostModal}>
                    Post Status <ArrowDropDownIcon />
                    <DropdownConfig open={openPostFlag} initDataSearch= {{postStatus : "unresolved"}}  search={refDataFilter} flag={2} />
                </span>
            </div>

            {/* <DataGridPro {...data} /> */}

        </div>

    )
}

export default Search;