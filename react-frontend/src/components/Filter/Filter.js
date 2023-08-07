import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { CgSortAz } from 'react-icons/cg'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { LuTimerReset } from 'react-icons/lu'



const Filter = ({ onSort, showMenuDate }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [sortBy, setSortBy] = useState(null);
    const location=useLocation()

    const handleSortClick = (sortOption) => {
        setSortBy(sortOption);
        onSort(sortOption);
        };
        useEffect(() => {
            const handleDocumentClick = (event) => {
            if (!event.target.closest('.mini-modal')) {
                setShowMenu(false)
            }
            };
            if (showMenu) {
            document.addEventListener('click', handleDocumentClick);
            }

            return () => {
            document.removeEventListener('click', handleDocumentClick);
            };
            }, [showMenu]);

    return (
        <div className='filter'>
            <div className='sorted' onClick={() => setShowMenu(true)}>
                <div className='icon-select all-sort'>
                    <AiOutlineUnorderedList></AiOutlineUnorderedList>
                    <span>Сортировка</span>
                </div>


                {showMenu && (
                    <div className='mini-modal1'>
                        <div className='icon-select' onClick={() => handleSortClick('all')}>
                            <div className='bg'>
                                <LuTimerReset></LuTimerReset>
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