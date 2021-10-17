import style from "./cricketer.module.css"
import React, { useEffect, useState } from "react";



const FullCricketer = ({ full_name }) => {


    const [cricketer, setCricketer] = useState({});
    const [table1, setTable1] = useState('');
    const [table2, setTable2] = useState('');
    const [team, setTeam] = useState('');
    const [achievments, setAchievments] = useState('');



    useEffect(() => {
        fetchCricketer(full_name);
    }, []);

    const fetchCricketer = async (full_name) => {

        const response = await fetch('http://localhost:9200/srilankancricketers/_search',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "query": {
                        "bool": {
                            "must": [{
                                "match": {
                                    "සම්පූර්ණ_නම": {
                                        "query": full_name,
                                        "operator": "and"
                                    }
                                }
                            }]
                        }
                    }

                }),
            }
        );
        const data = await response.json();
        var result = data.hits.hits[0]._source;
        console.log(result);
        setCricketer(result);


        var x1 = '';
        var keys1 = Object.keys(result.පුද්ගල_දක්ශතා.පිතිකරණය_සහ_පන්දු_රැකීම්);
        var z1 = result.පුද්ගල_දක්ශතා.පිතිකරණය_සහ_පන්දු_රැකීම්

        x1 = x1 + '<table> <tr><th>වර්ගය</th> <th>ශතක</th> <th>හතරේ පහර</th> <th>අර්ධ ශතක</th> <th>හයේ පහර</th> <th>සමාන්‍ය</th> <th>මුහුණ දුන් පන්දු ගණන</th> <th>උඩ පන්දු රැකගැනීම්</th> <th>වැඩිම ලකුණු</th> <th>ඉනිම්</th> <th>තරඟ</th> <th>ජර්සි අංකය</th> <th>මුළු ලකුණු</th> <th>දල ලකුණු ලබා ගැනීමේ වේගය</th> <th>ස්ටම්ප් කිරීම්</th> </tr> '

        keys1.map(key => {
            var y = z1[key];
            var keys1 = Object.keys(y);
            x1 = x1 + ' <tr> '
            x1 = x1 + ' <td> '
            x1 = x1 + key
            x1 = x1 + ' </td> '
            keys1.map(a => {
                x1 = x1 + ' <td> '
                x1 = x1 + y[a]
                x1 = x1 + ' </td> '
            });

            x1 = x1 + ' </tr> '

        })
        x1 = x1 + '</table>';
        setTable1(x1);



        var x2 = '';
        var keys2 = Object.keys(result.පුද්ගල_දක්ශතා.පන්දු_යැවීම්);
        var z2 = result.පුද්ගල_දක්ශතා.පන්දු_යැවීම්

        x2 = x2 + '<table> <tr><th>වර්ගය</th> <th>10w</th> <th>4w</th> <th>5w</th> <th>සමාන්‍ය</th> <th>BBI</th> <th>BBM</th> <th>Balls</th> <th>Econ</th> <th>ඉනිම්</th> <th>තරඟ</th> <th>මුළු ලකුණු</th> <th>දල ලකුණු ලබා ගැනීමේ වේගය</th> <th>Wkts</th> </tr> '
        keys2.map(key => {
            var y = z2[key];
            var keys2 = Object.keys(y);
            x2 = x2 + ' <tr> '
            x2 = x2 + ' <td> '
            x2 = x2 + key
            x2 = x2 + ' </td> '
            keys2.map(a => {
                x2 = x2 + ' <td> '
                x2 = x2 + y[a]
                x2 = x2 + ' </td> '
            });

            x2 = x2 + ' </tr> '

        })
        x2 = x2 + '</table>';
        setTable2(x2);




        var m = '';
        m = m + '<ul>'

        result.කණ්ඩායම්.map(y => {
            m = m + '<li>'
            m = m + y
            m = m + '</li>'
        })
        m = m + '</ul>'
        setTeam(m);

        var n = '';
        n = n + '<ul>'

        result.පුද්ගල_වාර්තා.map(z => {
            n = n + '<li>'
            n = n + z
            n = n + '</li>'
        })
        n = n + '</ul>'
        setAchievments(n);


    }


    return (
        <div className={style.colmd5} >
            <div className={style.card1}>
                <div >
                    <div className={style.avatar1}>
                        <img
                            src={cricketer.ඡායා_රූප}
                            className="card-img-top"
                            alt=""
                        />
                    </div>
                    <p>
                        <b>සම්පූර්ණ_නම:-</b> {cricketer.සම්පූර්ණ_නම} <br />
                        <b>උපන්දිනය:-</b> {cricketer.උපන්දිනය}<br />
                        <b>උපන්_ගම:-</b> {cricketer.උපන්_ගම}<br />
                        <b>පාසල:-</b>  {cricketer.පාසල}<br />
                        <b>වයස:-</b> {cricketer.වයස}<br />
                        <b>පිතිකරන_විලාසය:-</b> {cricketer.පිතිකරන_විලාසය}<br />
                        <b>පන්දු_යවන_ඉරියව්ව:-</b> {cricketer.පන්දු_යවන_ඉරියව්ව}<br />
                        <b>ජීවන_දත්ත:-</b> {cricketer.ජීවන_දත්ත}<br />
                        <b>කණ්ඩායම්:-</b>


                    </p>
                    <div className="content" dangerouslySetInnerHTML={{ __html: team }}></div>
                    <b>පුද්ගල_වාර්තා:-</b>
                    <div className="content" dangerouslySetInnerHTML={{ __html: achievments }}></div>
                    <b>පුද්ගල_දක්ශතා - පිතිකරණය සහ පන්දු රැකීම්</b><br />
                    &nbsp;
                    <div className="content" dangerouslySetInnerHTML={{ __html: table1 }}></div><br />
                    <b>පුද්ගල_දක්ශතා - පන්දු_යැවීම්</b><br />
                    &nbsp;
                    <div className="content" dangerouslySetInnerHTML={{ __html: table2 }}></div>




                </div>
            </div>
        </div>
    );
};

export default FullCricketer


