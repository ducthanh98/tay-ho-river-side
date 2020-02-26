import React, {useEffect, useState} from 'react';
import {Spin} from 'antd';
import {LoadingService} from "../services/loadingService";

const styles ={
    background:{
        position:'absolute',
        backgroundColor:'black',
        width:'100%',
        height:'100%',
        opacity:'0.6',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:99999
    }
}

const Loading = () => {
    const [isLoading,setLoading] = useState(LoadingService.get());

    useEffect(()=>{
        LoadingService.onChange('loading',()=>{
            setLoading(LoadingService.get())
        })

        return ()=>{
            LoadingService.deleteKey('loading');
        }
    },[])

    return (
        <>
            {
                isLoading && <div style={styles.background}><Spin size="large" /></div>
            }
        </>
    );
};

export default Loading;
