import React, { useState, useEffect } from 'react'; 
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const Cadastro = () => {
    const [nome, setNome] = useState(''); 
    const [descricao, setDescricao] = useState('');
    const [vCusto, setVCusto] = useState(''); 
    const [vVenda, setVVenda] = useState(''); 
    const [fornecedor, setFornecedor] = useState(''); 
    const [mensagem, setMensagem] = useState(''); 

    const [produtos, setProdutos] = useState([]); 

    
    useEffect(() => {

        const carregarProdutos = async () => {

            const produtosSalvos = await AsyncStorage.getItem('produtos');   
            if (produtosSalvos) {
               
                setProdutos(JSON.parse(produtosSalvos)); 
            }
        };
        
        carregarProdutos(); 
    }, []); 

    const handleCadastro = async () => {
        try {
            const produto = { nome, descricao, vCusto,vVenda, fornecedor }; 
            const novosProdutos = [...produtos, produto]; 
            await AsyncStorage.setItem('produtos', JSON.stringify(novosProdutos)); 

            setMensagem('Cadastro realizado com sucesso!'); 
            setNome(''); 
            setDescricao(''); 
            setVCusto(''); 
            setVVenda(''); 
            setFornecedor(''); 
            setProdutos(novosProdutos);
        } catch (error) {
            setMensagem('Erro ao cadastrar: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.input}
            />
            <TextInput
                placeholder="Valor de custo"
                value={vCusto}
                onChangeText={setVCusto}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Valor de venda"
                value={vVenda}
                onChangeText={setVVenda}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Fornecedor"
                value={fornecedor}
                onChangeText={setFornecedor}
                style={styles.input}
            />
            <Button title="Cadastrar" onPress={handleCadastro} /> 
            {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null} 

            <FlatList
                data={produtos}
                keyExtractor={(item, index) => index.toString()} 
                renderItem={({ item }) => (
                    <View style={styles.produtoContainer}>
                        <Text style={styles.produtoTexto}>Nome: {item.nome}</Text> 
                        <Text style={styles.produtoTexto}>Descrição: {item.descricao}</Text> 
                        <Text style={styles.produtoTexto}>Valor de custo: {item.vCusto}</Text> 
                        <Text style={styles.produtoTexto}>Valor de venda: {item.vVenda}</Text> 
                        <Text style={styles.produtoTexto}>Fornecedor: {item.fornecedor}</Text> 
                    </View>
                )}
                style={styles.lista}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9', 
    },
    input: {
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    mensagem: {
        marginTop: 12,
        color: 'green', 
        textAlign: 'center',
    },
    lista: {
        marginTop: 20, 
    },
    produtoContainer: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc', 
        borderRadius: 5,
        backgroundColor: '#e7f3fe', 
    },
    produtoTexto: {
        fontSize: 16, 
    },
});

export default Cadastro; 
