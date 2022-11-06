import React, { useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { search } from "../../redux/reducers/searchSlice";
import { useRouter } from "next/router";
import { Header } from "../../components/header";
import { FilterArea } from "../../components/filter";
import { ProductList } from "../../components/productList";
import { Footer } from "../../components/footer";
import { NextPage } from "next";
import PageSpin from "../../components/spin";
import styles from "../../styles/searchResult.module.css";

const SearchResult: NextPage = () => {
    const router = useRouter();
    const { keywords } = router.query;
    const location = router.pathname;

    const loading = useReduxSelector((s) => s.search.loading);
    const error = useReduxSelector((s) => s.search.error);
    const pagination = useReduxSelector((s) => s.search.pagination);
    const productList = useReduxSelector((s) => s.search.searchResult);

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
        return <PageSpin />;
    }

    if (error) {
        return <div>error：{error}</div>;
    }

    return (
        <div>
            <Header />
            <div className={styles["page-content"]}>
                <div className={styles["filter-container"]}>
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
