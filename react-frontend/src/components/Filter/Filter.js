import React, { useState, useEffect } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { CgSortAz } from 'react-icons/cg'
import { AiTwotoneCalendar } from 'react-icons/ai'


const Filter = ({ onSort, showMenuDate }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [sortBy, setSortBy] = useState(null);

    const handleSortClick = (sortOption) => {
        if (sortOption === 'all') {
        setSortBy(null);
        onSort(null)
        } else {
        setSortBy(sortOption);
        onSort(sortOption);
        }
        };

    return (
        <div className='filter'>
            <div className='sorted' onClick={() => setShowMenu(true)}>
                <div className='icon-select all-sort'>
                    <AiOutlineUnorderedList></AiOutlineUnorderedList>
                    <span>Сортировка</span>
                </div>


                {showMenu && (
                    <div className='mini-modal'>
                        <div className='icon-select' onClick={() => handleSortClick('all')}>
                            <div className='bg'>
                                <CgSortAz></CgSortAz>
                                <span>Сбросить</span>
                            </div>
                        </div>
                        <div className='icon-select'>
                            <div className='bg'>
                                <CgSortAz></CgSortAz>
                                <span>По алфавиту</span>
                            </div>
                            <ul className='sub-menu'>
                                <li onClick={() => handleSortClick('asc')}>От А до Я</li>
                                <li onClick={() => handleSortClick('desc')}>От Я до А</li>
                            </ul>
                        </div>
                        {showMenuDate &&(
                            <div className='icon-select'>
                            <div className='bg'>
                                <AiTwotoneCalendar></AiTwotoneCalendar>
                                <span>По дате</span>
                            </div>
                            <ul className='sub-menu'>
                                <li onClick={() => handleSortClick('date-asc')}>Сначала старые</li>
                                <li onClick={() => handleSortClick('date-desc')}>Сначала новые</li>
                            </ul>
                        </div>
                        )}
                    </div>
                )}

            </div>


        </div>
    );
};

export default Filter;