const token = '755df95b5f87ff302d60e3424a6bae38a73c8ad3281a98d5'

export const server_calls = {
    get: async () => { 
        const response = await fetch(`https://memegenerator-h2ed.onrender.com/api/images`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }

        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },

    create: async (data: any= {}) => {
        const  response = await fetch (`https://memegenerator-h2ed.onrender.com/api/images`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        if ( !response.ok ){
            throw new Error ('Failed to create new data on the server')
        }
        return await response.json()
    },
    update: async (id: string, data: any = {}) => {
    const response = await fetch(`https://memegenerator-h2ed.onrender.com/api/images${id}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type' :  'application/json',
            'x-access-token': `Bearer  ${token}`
        },
        body: JSON.stringify(data)
    })
    if (!response.ok ) {
        throw new Error('Failed to update data on the server')
    }
    return await  response.json()
    },

    delete: async (id:string) => {
        const response = await fetch (`https://memegenerator-h2ed.onrender.com/api/images${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token':  `Bearer ${token}`
            },
        })
        if ( !response.ok ) {
            throw new Error('Failed to delete data from the server')
        }
        return;
    },

    createWithFormData: async (formData: FormData) => {
        const response = await fetch(`https://memegenerator-h2ed.onrender.com/api/images`,{
            method: 'POST',
            headers: {
                'x-access-token' : `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok ) {
            throw new Error('Failed to create new data on the server');
        };
    }
}

