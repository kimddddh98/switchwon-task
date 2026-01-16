import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/routes/path'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type SignInValues = {
  email: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>()
  const { login } = useAuth()
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(ROUTES.EXCHANGE, {
        replace: true,
      })
    },
  })
  const onSubmit = (data: SignInValues) => {
    mutate(data.email)
  }

  return (
    <main className="flex h-screen w-full flex-col justify-center gap-12 px-4 md:px-0 xl:mx-auto xl:w-7xl">
      <div className="flex flex-col gap-2">
        <h2 className="text-center text-3xl font-bold md:text-4xl xl:text-5xl">
          반갑습니다.
        </h2>
        <h3 className="text-switchwon-gray-600 text-center text-2xl font-medium md:text-3xl xl:text-[32px]">
          로그인 정보를 입력해주세요.
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-switchwon-gray-0 border-switchwon-gray-300 flex w-full flex-col self-center rounded-[20px] border px-6 py-4 md:w-[560px] xl:px-8 xl:py-6"
      >
        <p className="text-switchwon-gray-600 font-medium md:text-lg xl:text-xl">
          이메일 주소를 입력해주세요.
        </p>
        <input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: EMAIL_REGEX,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
          className={`text-switchwon-gray-600 border-switchwon-gray-700 mt-3 rounded-xl border bg-white p-3 font-semibold md:p-5 md:text-xl xl:p-6 ${errors.email ? 'border-switchwon-red' : 'border-switchwon-gray-700'}`}
        />
        {errors.email && (
          <p className="text-switchwon-red mt-2 text-sm xl:text-base">
            {errors.email.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-switchwon-cta-1 mt-4 h-14 cursor-pointer rounded-2xl text-lg font-bold text-white md:h-16 xl:mt-8 xl:h-[77px] xl:text-[22px]"
        >
          로그인 하기
        </button>
      </form>
    </main>
  )
}

export default SignIn
