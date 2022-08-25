import React, {useEffect} from "react";
import styles from "./SearchPage.module.css";
import {Header, Footer, FilterArea, ProductList} from "../../components";
import {useLocation, useParams} from "react-router-dom";
import {useReduxDispatch, useReduxSelector} from "../../redux/hooks";
import {searchProduct} from "../../redux/productSearch/slice";
import {Spin} from "antd";

type MatchParams = {
    keywords: string;
}

export const SearchPage: React.FC = () => {

    const {keywords} = useParams<MatchParams>();

    const loading = useReduxSelector((s) => s.productSearch.loading);
    const error = useReduxSelector((s) => s.productSearch.error);
    const pagination = useReduxSelector((s) => s.productSearch.pagination);
    const productList = useReduxSelector((s) => s.productSearch.searchResult);

    const dispatch = useReduxDispatch();
    const location = useLocation();

    useEffect(() => {
        if (keywords) {
            dispatch(searchProduct({nextPage: 1, pageSize: 10, keywords}));
        }
    }, [dispatch, keywords, location])

    const onPageChange = (nextPage, pageSize) => {
        if (keywords) {
            dispatch(searchProduct({nextPage, pageSize, keywords}));
        }
    }

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            />
        );
    }

    if (error) {
        return <div>error：{error}</div>;
    }

    return (
        <div>
            <Header/>
            <div className={styles["page-content"]}>
                <div className={styles["product-list-container"]}>
                    <FilterArea/>
                </div>
                <div className={styles["product-list-container"]}>
                    <ProductList
                        data={productList}
                        paging={pagination}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}