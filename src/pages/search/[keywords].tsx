import React, { useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { search } from "../../redux/reducers/prodSearchSlice";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { Header } from "../../components/header";
import { FilterArea } from "../../components/filter";
import { ProductList } from "../../components/productList";
import { Footer } from "../../components/footer";
import { NextPage } from "next";

const SearchResult: NextPage = () => {
    const router = useRouter();
    const { keywords } = router.query;
    const location = router.pathname;

    const loading = useReduxSelector((s) => s.productSearch.loading);
    const error = useReduxSelector((s) => s.productSearch.error);
    const pagination = useReduxSelector((s) => s.productSearch.pagination);
    const productList = useReduxSelector((s) => s.productSearch.searchResult);

    const dispatch = useReduxDispatch();

    useEffect(() => {
        if (keywords) {
            dispatch(search({ nextPage: 1, pageSize: 10, keywords }));
        }
    }, [dispatch, keywords, location]);

    const onPageChange = (nextPage, pageSize) => {
        if (keywords) {
            dispatch(search({ nextPage, pageSize, keywords }));
        }
    };

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%"
                }}
            />
        );
    }

    if (error) {
        return <div>error：{error}</div>;
    }

    return (
        <div>
            <Header />
            <div className={"page-content"}>
                <div className={"product-list-container"}>
                    <FilterArea />
                </div>
                <div className={"product-list-container"}>
                    <ProductList
                        data={productList}
                        pagination={pagination}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchResult;
