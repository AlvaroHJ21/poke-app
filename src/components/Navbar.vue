<template>
    <div class="navbar">
        <p class="points">
            Puntos: <span>{{ points }}</span>
        </p>
        <p class="lifes">
            Vidas:
            <span>
                <svg
                    v-for="life in new Array(lifes)"
                    :key="life"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-heart"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                </svg>
            </span>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        points: {
            type: Number,
            required: true,
        },
        lifes: {
            type: Number,
            required: true,
        },
    },
    // data() {
    //     return {
    //         lifes: [1, 2, 3],
    //     };
    // },
};
</script>

<style>
.navbar {
    min-width: 100vw;
    background-color: var(--dark);
    height: 64px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    font-size: 1.6rem;
    font-family: 'Orbitron', 'sans-serif';
}
.lifes {
    display: flex;
    align-items: center;
}
.lifes span {
    display: flex;
    align-items: center;
}
.lifes span svg {
    margin-left: 1rem;
}
</style>
