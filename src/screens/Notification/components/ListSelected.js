import React from 'react';
import {Icon} from "antd";

const styles = {
    listSelectedWrap:{
        border:'1px solid #D9D9D9',
        width:'50%',
        position:'relative',
        minHeight:32
    },
    ul:{
        display: 'inline-block',
        marginBottom:'3px',
    },
    li:{
        color: 'rgba(0, 0, 0, 0.65)',
        backgroundColor: '#fafafa',
        border: '1px solid #e8e8e8',
        borderRadius: '2px',
        display:'inline-block',
        listStyle:'none',
        margin:'4px 4px 0 0',
        padding:'0 10px'
    },
    img:{
        position: 'absolute',
        top:-1,
        right: -32,
        width: 32,
        height:32,
        border:'1px solid #D9D9D9',

    }
}

const ListReceiver =(props)=> {
    const removeReceiver = (index)=>{
        const list = [...props.listReceiver]
        list.splice(index,1);
        props.setListReceiver(list);
    }

        return (
            <div style={styles.listSelectedWrap} >
                <ul style={styles.ul}>
                    {
                        props.listReceiver.map((value,index) =>{

                            return (
                                <li key={value.key} style={styles.li}>
                                    {value.name}
                                    <Icon type="close" onClick={()=>removeReceiver(index)} />
                                </li>
                            )
                        })
                    }
                </ul>
                <img alt={'list receiver'} style={styles.img} onClick={()=>props.handleShowModal(true)} className={'render-reciever-btn'} src={require('../../../assets/images/format_list_bulleted-24px.svg')} />

            </div>

        );
}

export default ListReceiver;
