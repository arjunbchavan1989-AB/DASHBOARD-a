fetch('data/snapshot.json')
    .then(r=>r.json())
    .then(data => {
        const groupsDiv = document.getElementById('groups');
        Object.entries(data.groups).forEach(([group, tickers]) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group';
            groupDiv.innerHTML = `<h2>${group}</h2>`;
            tickers.forEach(t => {
                const tickerDiv = document.createElement('div');
                tickerDiv.className = `ticker ${t.daily > 0 ? 'positive' : 'negative'}`;
                tickerDiv.innerHTML = `
                    ${t.rs_chart ? `<img src="${t.rs_chart}">` : ''} 
                    ${t.ticker}: ${t.daily}% ${t.rs || ''} ${t.abc || ''}
                `;
                groupDiv.appendChild(tickerDiv);
            });
            groupsDiv.appendChild(groupDiv);
        });
    });

fetch('data/events.json').then(r=>r.json()).then(events => {
    document.getElementById('events').innerHTML = 
        events.map(e => `<div>${e.date} ${e.time} - ${e.event}</div>`).join('');
});
