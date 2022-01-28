import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMjQyNCwiZXhwIjoxOTU4ODk4NDI0fQ.kvmiJZXVMRo6WH7e6y2Z9k5ndoqUniUkHngylobzXOo';
const SUPABASE_URL = 'https://kmswqdlzhoqdpiafzsmt.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6


export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('');
    const [mensagens, setMensagens] = React.useState([]);
    //const [username, setUsername] = React.useState('');

    React.useEffect(() => { //lidar com tudo que foge do uso padrão do componente(execução do componente)
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false})
            .then(({data}) => {
                console.log('dados da consulta:', data);
                setMensagens(data);
            });
    }, []); 
   

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
           // id: mensagens.length + 1,
            de: 'franckoliveira',
            texto: novaMensagem,
            //horario: (new Date().toLocaleString()),
        };

        supabaseClient
            .from('mensagens')
            .insert([
                //tem que ser objeto com os mesmos campos que está no supabase
                mensagem
            ])
            .then (({ data }) => {
                console.log('Criando mensagem: ', data);
                setMensagens([data[0], ...mensagens,]);

            });

        setMensagens([mensagem, ...mensagens,]);
        setMensagem('');
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://i.imgur.com/ZouQsEd.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals["1000"],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals["700"],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={mensagens} />
                    {/* {Mensagens.map((mensagematual) => {
                        return(
                            <li key={mensagematual.id}>
                                {mensagematual.de}: {mensagematual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }
                            }
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                    if (mensagem.trim() !== '')
                                        handleNovaMensagem(mensagem)
                                    else setMensagem('');
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            disabled={!mensagem}
                            onClick={() => {
                                if (mensagem.trim() !== '') handleNovaMensagem(mensagem)
                                else setMensagem('');
                            }}
                            iconName="paperPlane"
                            rounded="none"
                            buttonColors={{
                                contrastColor: `${appConfig.theme.colors.primary[500]}`,
                                mainColor: `${appConfig.theme.colors.neutrals[800]}`,
                                mainColorLight: `${appConfig.theme.colors.neutrals[600]}`,
                                mainColorStrong: `${appConfig.theme.colors.neutrals[900]}`
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    ALIENCORD CHAT
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    //console.log('MessageList',props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            > {(new Date().toLocaleDateString())}
                        
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}


        </Box>
    )
}