/* globals module */

"use strict";

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10;

module.exports = function(data) {
    return {
        search(req, res) {
            let pattern = req.query.pattern || "";
            let page = Number(req.query.page || DEFAULT_PAGE);

            return Promise.all([data.searchEvents(({ pattern, page, pageSize: PAGE_SIZE })), data.searchCategories({ pattern, page, pageSize: PAGE_SIZE })])
                .then(([events, categories]) => {
                    return res.render("search/search", {
                        model: {
                            events,
                            categories
                        },
                        params: { pattern },
                        user: req.user
                    });
                });
        }
    };
};